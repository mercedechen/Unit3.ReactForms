import { useState } from 'react'

function Authenticate({token}) {

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
      try {
        const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const result = await response.json();
        console.log("result", result);
        setSuccessMessage(result.message);
        setUsername(result.data.username);
        console.log("result", result);
      } catch (error) {
        setError("Unable to authenticate due to missing username or password. Please try again.", error.message);
      }
    }

  return (
    <>
      <h2>Authenticate</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Username: {username}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  )
}

export default Authenticate;