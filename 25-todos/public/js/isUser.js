async function isUser(id, password) {
  try {
    const response = await fetch(`http://localhost:3000/users?id=${id}`)
    const user = await response.json()

    if(user[0] && password === user[0].password) {
      return {
        res: "success"
      }
    }
    else if(user[0] && password != user[0].password){
      return {
        res: "fail",
        message: "Your Password is wrong"
      }
    }
    else if(!user[0]) {
      return {
        res: "fail",
        message: "Your ID or Password is wrong"
      }
    }
  } catch (error) {
    console.log(error.message)
    return {
      res: "fail",
      message: "something goes wrong"
    }
  }
}

export default isUser