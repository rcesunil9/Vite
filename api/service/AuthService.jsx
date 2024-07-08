import APIManager from '../ApiManager';
import { EndPoints } from '../EndPoints';

export const loginAccount = async ({ email, password }) => {
  // const body = { email, password };
  const body = new FormData();
  body.append('email', email);
  body.append('password', password);
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.Login,
      method: 'POST',
      body: body, 

    };
    console.log("Sending login request...");
    const response = await APIManager.makeRequest(request, false);

    if (response && response.code === "101") {
      const user = response.data;
      const accessToken = user?.access_token || '';
      localStorage.setItem('access_token', accessToken);

      if (user) {
        const userId = user.id;
        localStorage.setItem('user_id', JSON.stringify(userId));
      }

      console.log("Login successful:", user);
      return user;
    } else {
      console.error("Login failed:", response.statusText);
      throw new Error("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    // alert(`Login error : ${error.message}`);
    
    throw error;
  }
};

export const handleRegister = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.Register,
      method: 'POST',
      body: body,
    };

    console.log("Sending registration request...");
    const response = await APIManager.makeRequest(request, false);

    console.log(response,"jshdhih")

    if (response && response.code === "101") {
      const user = response.data;
      const accessToken = user?.access_token || '';
      localStorage.setItem('access_token', accessToken);

      if (user) {
        const userId = user.id;
        localStorage.setItem('user_id', JSON.stringify(userId));
      }

      console.log("Register successful:", user);
      return user;
    } else {
      console.error("Login failed:", response.statusText);
      throw new Error("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const handleForgetPassword = async (formData) => {
    try {
      const body = new FormData();
      for (const key in formData) {
        // console.log(formData[key])
        body.append(key, formData[key]);
      }
      const request = {
        url: EndPoints.BASEURL + EndPoints.reset_password_api,
        method: "POST",
        body: body
      }
      
      const response = await APIManager.makeRequest(request, false)

      //  if (response.status && response.code === "101") {
      //       // alert(response.message); // Show alert message
          
      //   } else {
      //       // Handle other cases if needed
      //   }
      return response
    } catch (error) {
       console.log("forget password error", error)
       throw error
    }
}
// export const password_verify_api  = async (formData) => {
//   try {
//     const body = new FormData();
//     for (const key in formData) {
//       // console.log(formData[key])
//       body.append(key, formData[key]);
//     }
//     const request = {
//       url: EndPoints.BASEURL + EndPoints.password_verify_api ,
//       method: "POST",
//       body: body
//     }
    
//     const response = await APIManager.makeRequest(request, false)

//      if (response.status && response.code === "101") {
//           alert(response.message); // Show alert message
          
//       } else {
//           // Handle other cases if needed
//       }
//     return response.data
//   } catch (error) {
//      console.log("forget password error", error)
//      throw error
//   }
// }

export const logout = async () => {
  try{
    const request = {
      url: EndPoints.BASEURL + EndPoints.logout,
      method: "GET",
      body: {}
    }
    const response = await APIManager.makeRequest(request, false);
    localStorage.removeItem('access_token')
 
    return response.data;
  } catch (e) {
    console.log(' failed to logout the user');
    throw e;
  } 
}




