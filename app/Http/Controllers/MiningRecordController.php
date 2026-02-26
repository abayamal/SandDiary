<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMiningRecordRequest;
use App\Http\Requests\UpdateMiningRecordRequest;
use App\Http\Resources\DailyMiningResource;
use App\Http\Resources\MiningRecordResource;
use App\Models\MiningRecord;
use App\Models\MiningRecordItem;
use App\Models\SandMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;
use function Symfony\Component\Clock\now;

class MiningRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dailyRecords = MiningRecord::with(['items'])
                        ->withCount('items')
                        ->orderByDesc('date')
                        ->paginate(5);

        return DailyMiningResource::collection($dailyRecords);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMiningRecordRequest $request)
    {
        $valdatedData = $request->validated();

        try {
            // Wrap in a transaction to ensure atomicity
            $miningRecord = DB::transaction(function () use ($valdatedData){

                // Create main mining record
                $miningRecord = MiningRecord::create([
                    'date'=>$valdatedData['date']
                ]);

                $items = collect($valdatedData['records'])->map(fn($record)=>[
                        'mining_record_id'=>$miningRecord->id,
                        'worker_id'=>$record['workerId'],
                        'volume'=>$record['volume'],
                        'number_of_loads'=>$record['numberOfLoads'],
                        'created_at' => now(),
                        'updated_at' => now(),
                ])->toArray();

                MiningRecordItem::insert($items);

                // create sand movement (IN) - ledger entries

                $movements = collect($items)->map(fn ($item)=>[
                    'type'=>SandMovement::TYPE_IN,
                    'loads'=>$item['number_of_loads'],
                    'volume'=>$item['volume'],
                    'reference_type'=>MiningRecord::class,
                    'reference_id'=>$miningRecord->id,
                    'created_at'     => now(),
                    'updated_at'     => now(),
                ])->toArray();

                SandMovement::insert($movements);

                return $miningRecord;

            });
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create record', 'error' => $e->getMessage()], 500);
        }

        return response()->json([
            'message'=>'Daily mining record created successfully',
            'data'=> $miningRecord->load('items')
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $miningRecord = MiningRecord::with(['items'])->find($id);

        return new MiningRecordResource($miningRecord);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMiningRecordRequest $request, string $id)
    {
        $validatedData = $request->validated();

        try{

            DB::transaction(function () use ($validatedData,$id){
                $miningRecord = MiningRecord::with('items')->findOrFail($id);

                $miningRecord->update([
                    'date'=>$validatedData['date']
                ]);

                $existingItems = $miningRecord->items->keyBy('id');

                $existingIds = [];

                foreach($validatedData['records'] as $record)   {

                    //Already exist records
                    if(isset($record['id']) && is_numeric($record['id'])){
                        $item = $existingItems[$record['id']];

                        $item->update([
                            'worker_id'=>$record['workerId'],
                            'volume'=>$record['volume'],
                            'number_of_loads'=>$record['numberOfLoads'],
                            'updated_at'=>now(),
                        ]);

                    }else{
                        //new records
                        $item = $miningRecord->items()->create([
                            'worker_id'=>$record['workerId'],
                            'volume'=>$record['volume'],
                            'number_of_loads'=>$record['numberOfLoads'],
                            'updated_at'=>now(),
                        ]);
                    }

                    $existingIds[] = $item->id;

                }

                // delete removed records
                $miningRecord->items()->whereNotIn('id',$existingIds)->delete();

                //Remove previous records in sand movement table
                SandMovement::where('reference_type',MiningRecord::class)->where('reference_id',$miningRecord->id)->delete();

                //Recreate updated sand movement
                $movements = collect($validatedData['records'])->map(fn ($item)=>[
                    'type'=>SandMovement::TYPE_IN,
                    'loads'=>$item['numberOfLoads'],
                    'volume'=>$item['volume'],
                    'reference_type'=>MiningRecord::class,
                    'reference_id'=>$miningRecord->id,
                    'created_at'     => now(),
                    'updated_at'     => now(),
                ])->toArray();

                SandMovement::insert($movements);

            });

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Failed to update record',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message'=>'Mining Record Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
