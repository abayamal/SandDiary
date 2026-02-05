<?php

namespace App\Http\Controllers;

use App\Models\MiningRecord;
use Illuminate\Http\Request;
use App\Models\MiningRecordItem;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreMiningRecordRequest;

class MiningRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
