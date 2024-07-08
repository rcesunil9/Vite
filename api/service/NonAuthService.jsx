import { EndPoints } from "../EndPoints";
import APIManager from "../ApiManager";

export const getUserProfile = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.getUserProfile,
      method: "GET",
      body: {}, // No need to include body for GET request
    };
    const response = await APIManager.makeRequest(request, false);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch user profile. Please try again.", error);
    throw error;
  }
};


export const getCategory = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.getCategory,
      method: "GET",
      body: {},
    };
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");
    return response.data;
  } catch (e) {
    console.log(" failed to fatch category.");
    throw e;
  }
};
export const get_blog_list = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_blog_list,
      method: "POST",
      body: body,
    };
   
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");
    return response.data;
  } catch (e) {
    console.log(" failed to fatch blog.");
    throw e;
  }
};
export const password_verify_api  = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.password_verify_api ,
      method: "POST",
      body: body,
    };
   
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");
    return response.data;
  } catch (e) {
    console.log(" failed to fatch blog.");
    throw e;
  }
};
export const update_password_api  = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.updatePassword ,
      method: "POST",
      body: body,
    };
   
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");
    return response;
  } catch (e) {
    console.log(" failed to fatch blog.");
    throw e;
  }
};
export const venue_max_filter_data = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.venue_max_filter_data,
      method: "GET",
      body: {},
    };
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");
    return response.data;
  } catch (e) {
    console.log(" failed to fatch category.");
    throw e;
  }
};
export const get_sub_category = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_sub_category,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");

    return response.data;
  } catch (e) {
    console.log(" failed to fatch subcategory.");
    throw e;
  }
};
export const get_page_detail = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_page_detail,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");

    return response.data;
  } catch (e) {
    console.log(" failed to fatch subcategory.");
    throw e;
  }
};
export const switchAnnouncementType = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.switchAnnouncementType,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    // console.log(response, "category data");

    return response.data;
  } catch (e) {
    console.log(e)
    throw e;
  }
};

// Book mark functionilty start
export const get_propery_by_category = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_property_category_wise,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const add_to_bookmark = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.add_to_bookmark,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getBookmarks = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.getBookmarks,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);
    return response;
  } catch (error) {
    throw error;
  }
};
// export const getBookmarks = async (formData) => {
//   try {
//     // const body = new FormData();
//     // for (const key in formData) {
//     //   body.append(key, formData[key]);
//     // }
//     const request = {
//       url: EndPoints.BASEURL + EndPoints.getBookmarks,
//       method: "POST",
//       body: formData,
//     };
//     const response = await APIManager.makeRequest(request, false);
//     return response.data;
//   } catch (error) {
//     console.log("Failed to fetch user profile. Please try again.", error);
//     throw error;
//   }
// };
// Book mark functionilty close

export const enquiry_submit = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.enquiry_submit,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    console.log("Registration error:", error);
    throw error;
  }
};

export const get_venue_feature = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_venue_feature,
      method: "GET",
      body: {},
    };
    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    console.log(error, "venue data");
  }
};

export const get_entertainment_feature = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_entertainment_feature,
      method: "GET",
      body: {},
    };

    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    console.log(error, "entertainment data");
  }
};

export const get_property_detail = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_property_detail,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    console.log("Registration error:", error);
    throw error;
  }
};
export const event_category = async () => {
  try {
    const request = {
      url: EndPoints.BASEURL + EndPoints.event_category,
      method: "GET",
      body: {},
    };
    // console.log("event category");
    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (e) {
    console.log("Failed to fetch event categories.");
    throw e;
  }
};

export const add_edit_venue = async (formData) => {
  try {
    const body = new FormData();

    for (const key in formData) {
      if (key === "venue_image") {
        formData[key].forEach((item) => {
          body.append(`venue_image[]`, item);
        });
      } else {
        body.append(key, formData[key]);
      }
    }

    const request = {
      url: EndPoints.BASEURL + EndPoints.add_edit_venue,
      method: "POST",
      body: body,
    };

    const response = await APIManager.makeRequest(request, false);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add_edit_entertainment = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      if (key === "entertainment_image") {
        formData[key].forEach((item) => {
          body.append(`entertainment_image[]`, item);
        });
      } else {
        body.append(key, formData[key]);
      }
      if (key === "entertainment_video") {
        formData[key].forEach((item) => {
          body.append("entertainment_video[]", item);
        });
      } else {
        body.append(key, formData[key]);
      }
    }

    const request = {
      url: EndPoints.BASEURL + EndPoints.add_edit_entertainment,
      method: "POST",
      body: body,
    };

    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add_edit_rental_and_service = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      if (key === "rental_image") {
        formData[key].forEach((item) => {
          body.append(`rental_image[]`, item);
        });
      } else {
        body.append(key, formData[key]);
      }
    }

    const request = {
      url: EndPoints.BASEURL + EndPoints.add_edit_rental_and_service,
      method: "POST",
      body: body,
    };

    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update_user_profile = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.update_user_profile,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);

    return response.data;
  } catch (error) {
    console.log("Error in updating profile information:", error);
    throw error;
  }
};

export const change_password_api = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.change_password_api,
      method: "POST",
      body: body,
    };
    const response = await APIManager.makeRequest(request, false);

    return response;
  } catch (error) {
    // console.log("Error in updating profile information:", error);
    return error;
  }
};

export const get_venue_list_with_filter = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_venue_list_with_filter,
      method: "POST",
      body: body,
    };
    const r = await APIManager.makeRequest(request, false);
    return r.data;
  } catch (e) {
    console.log("Failed to get venues list.");
  }
};
export const delete_property = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.delete_property,
      method: "POST",
      body: body,
    };
    const r = await APIManager.makeRequest(request, false);
    return r.data;
  } catch (e) {
    console.log("Failed to get venues list.");
  }
};
export const get_entertainment_list_with_filter = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_entertainment_list_with_filter,
      method: "POST",
      body: body,
    };
    const r = await APIManager.makeRequest(request, false);
    return r.data;
  } catch (e) {
    console.log("not found");
  }
};
export const get_rental_and_services_list_with_filter = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url:
        EndPoints.BASEURL + EndPoints.get_rental_and_services_list_with_filter,
      method: "POST",
      body: body,
    };
    const r = await APIManager.makeRequest(request, false);
    return r.data;
  } catch (e) {
    console.log("not found");
  }
};

export const getRentalServices = async (formData) => {
  try {
    const body = new FormData();
    for (const key in formData) {
      // console.log(formData[key])
      body.append(key, formData[key]);
    }
    const request = {
      url: EndPoints.BASEURL + EndPoints.get_rental_services_list,
      method: "POST",
      body: body,
    };
    const r = await APIManager.makeRequest(request, false);
    return r.data;
  } catch (e) {
    console.log("Failed to rental and services list.");
  }
};
