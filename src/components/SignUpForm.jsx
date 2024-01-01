import { useState } from 'react'

function SignUpForm({setToken}) {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault();
    if ((username.length < 8) || (password.length < 8)) {
      setError("Username/password must be more than 8 characters.")
    } else {
      try {
        // use the values from state, not the state-setting functions
        const postData = {
          username: username,
          password: password
        };
        console.log(postData);

        const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
          });

        const result = await response.json();
        console.log("result: ", result);

        setToken(result.token);

      } catch (error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username: <input value={username} onChange={(event) => setUsername(event.target.value)}/></label>
        <label>Password: <input value={password} onChange={(event) => setPassword(event.target.value)}/></label>
        <button id="submit">Submit</button>
      </form>
    </>
  )
}

export default SignUpForm