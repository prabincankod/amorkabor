import { useRouter } from "next/navigation";
import { createClient } from "supabase/component";


const Login = () => {
  const supabase = createClient();

  const getSession = supabase.auth.getSession
  const router = useRouter();
  async function logIn() {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: "prabinsubedi2016@gmail.com",
      password: "prabin",
    });
    if (error) {
      console.log(error.message);
    } else {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });


    }
    // router.push("/");
  }

  return (
    <>
      <div>
{/* logged in as {JSON.stringify(  getSession.then(data=>data.data.session))} */}

<button onClick={async()=>await getSession()}> getAuthsession </button>
        login page <button onClick={logIn}> login </button>{" "}
      </div>
    </>
  );
};
export default Login;
