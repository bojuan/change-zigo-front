import { Button } from "@/components/ui/button";
import Layout from "@/app/layout";
import { TableAppointment } from "@/components/atomic-design/table-appointment";
import { Appointment } from "@/interfaces/appointment";

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
        email: "juan_rod@gmail.com",
        phone: "0999999999",
      },
      createdAt: "YYYY-MM-DDTHH:mm:ssZ",
      updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
    },
  ];

export default function Home() {
  return (
    <Layout>

        <TableAppointment data={data} />
      <div>
        <Button>Init</Button>
      </div>
    </Layout>
  );
}
