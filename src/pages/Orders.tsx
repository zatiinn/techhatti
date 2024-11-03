// components/OrdersList.tsx
import useOrdersStore from "@/hooks/orderStore";
import { Order, OrderStatus } from "@/lib/Types";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
};

interface OrderItemProps {
  order: Order;
}

const OrderItemUI: FC<OrderItemProps> = ({ order }) => (
  <div className="p-4 border rounded-lg shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="font-medium">Order ID: {order.id}</p>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Total: ${order.total.toFixed(2)}</p>
          <p>Items: {order.items.length}</p>
          <p>Date: {order.createdAt.toDate().toLocaleDateString()}</p>
        </div>
      </div>
      <OrderStatusBadge status={order.status} />
    </div>

    <div className="mt-4">
      <h4 className="font-medium mb-2">Order Items</h4>
      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface OrdersListProps {
  userId: string;
}

export const OrdersList: FC<OrdersListProps> = ({ userId }) => {
  const { orders, isLoading, error, fetchOrders } = useOrdersStore();

  useEffect(() => {
    fetchOrders(userId);
  }, [fetchOrders, userId]);

  console.log(orders)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderItemUI key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrdersPage: FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>Loading...</div>;
  }

  console.log(userId)

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <OrdersList userId={userId} />
      </div>
    </div>
  );
};

export default OrdersPage;