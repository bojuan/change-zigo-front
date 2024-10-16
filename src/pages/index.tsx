import Layout from "@/app/layout";
import { TableAppointment } from "@/components/atomic-design/organism/table-appointment/table-appointment";
import { Appointment } from "@/interfaces/appointment";
import { useRouter } from "next/router";

const data: Appointment[] = [
  {
    id: "m5gr84i9",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "juan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
  {
    id: "abc",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "auan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <TableAppointment
        data={data}
        onEdit={(id) => router.push(`/edit/${id}`)}
        onRemove={(id) => console.log("Remove", id)}
        onAdd={() => router.push(`/create`)}
      />
    </Layout>
  );
}
