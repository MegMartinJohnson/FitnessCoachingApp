import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClientTabs } from "@/components/clients/client-tabs"

// This would come from your database
const getClient = async (clientId: string) => {
  // Simulated client data
  const client = {
    id: clientId,
    name: "John Smith",
    photo: "/placeholder.svg",
    email: "john@example.com",
  }
  return client
}

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { clientId: string }
}) {
  const client = await getClient(params.clientId)

  if (!client) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={client.photo} alt={client.name} />
          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{client.name}</h1>
      </div>
      <ClientTabs clientId={client.id} />
      {children}
    </div>
  )
}

