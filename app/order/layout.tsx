import OrderSidebar from "@/components/Order/OrderSidebar";
import { OrderSummary } from "@/components/Order/OrderSummary";

export default function OrderLayout({ children}: Readonly<{children: React.ReactNode}>) {
    return(
        <>
            <div className="md:flex">
                <OrderSidebar />

                <main className="md:flex-1 p-5 md:h-screen md:overflow-y-scroll">
                    {children}
                </main>

                <OrderSummary />
            </div>
        </>
    )
}