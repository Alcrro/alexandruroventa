"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoRecords() {
  const [count, setCount] = useState(5);

  const router = useRouter();
  useEffect(() => {
    // each second count=count-1
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    // if count===0 redirect

    count <= 0 && router.replace(`/`);

    // always clear the timeers in return function
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="text-center ">
      <div className="results text-2xl">No records</div>
      <div className="redirect text-2l">
        You will be redirected in {count} to the home page
      </div>
    </div>
  );
}
