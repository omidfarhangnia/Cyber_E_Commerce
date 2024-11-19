export default async function Page({ params }) {
  return <h1>{JSON.stringify(params)}</h1>;
}
