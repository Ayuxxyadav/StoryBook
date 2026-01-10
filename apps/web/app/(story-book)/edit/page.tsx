import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";




interface Story {
    id: string,
    Title: string ,
    Description:string
}



export default function Delete() {
 const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStories() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/delete`, {
        headers: {
          Authorization: token,
        },{
            id
        }
      });


      setStories(response.data.story);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
  <div>
    
  </div>
  );
}