import Image from "next/image";
// import Link from "next/link";
import Button from "@mui/material/Button";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="pb-[10px]">Home page </h1>
        <Button variant="contained" href="/auth">
          Contained
        </Button>
    </main>
  );
}
