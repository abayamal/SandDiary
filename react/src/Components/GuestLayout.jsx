import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/sand.PNG"
            className="mx-auto h-30 w-auto"
          />
        </div>
        <Outlet/>
      </div>
    </>
  )
}
