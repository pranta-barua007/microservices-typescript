import Link from "next/link";

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            <p>
              {order.ticket.title} - {order.status}
              <Link href="/orders/[orderId]" as={`/orders/${order.id}`}>
                <a className="nav-link">View</a>
              </Link>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
