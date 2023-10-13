export default function Page({ params }: { params: { id: number } }) {
  return <div>Room ID: {params.id}</div>;
}
