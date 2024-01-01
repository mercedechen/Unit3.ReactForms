import { useState } from 'react'

function SignUpForm() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // use the values from state, not the state-setting functions
      const postData = {
        username: username,
        password: password
      };
      console.log(postData)

      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        });

      const json = await response.json();
      console.log("json: ", json);
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username: <input value={username} onChange={(event) => setUsername(event.target.value)}/></label>
        <label>Password: <input value={password} onChange={(event) => setPassword(event.target.value)}/></label>
        <button>Submit</button>
      </form>
    </>
  )
}

export default SignUpForm