const APIURL = "http://localhost:3001";

/*** USER APIs */

async function deleteCommittedPlan(userId) {
  try {
    const res = await fetch(APIURL + `/auth/deleteCommittedPlan/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      return res;
    } else {
      const text = await res.text();
      throw new TypeError(text);
    }
  } catch (ex) {
    throw ex;
  }
}

async function commitPlan(plan, userId, subscription) {
  try {
    const res = await fetch(APIURL + `/auth/commitPlan/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({plan: plan, subscription: subscription}),
    });
    if (res.ok) {
      return res;
    } else {
      const text = await res.text();
      throw new TypeError(text);
    }
  } catch (ex) {
    throw ex;
  }
}

/*** COURSES APIs */

async function getCourses() {
  try {
    const res = await fetch(APIURL + "/unauth/courses");
    if (res.ok) {
      const coursesJson = await res.json();

      const coursesList = coursesJson.map((c) => {
        return {
          code: c.code,
          name: c.name,
          credits: c.credits,
          maxStudents: c.maxStudents,
          enrolled: c.enrolled,
          incompatibleWith: c.incompatibleWith,
          preparatoryCourse: c.preparatoryCourse
        };
      });
      return coursesList;
    } else {
      const text = await res.text();
      throw new TypeError(text);
    }
  } catch (ex) {
    throw ex;
  }
}

/*** AUTHENTICATION APIs */

const getProfile = async (id) => {
  try {
    const res = await fetch(APIURL + `/auth/getprofile/${id}`, {
      credentials: "include",
    });
    if (res.ok) {
      const profileJson = await res.json();
      return profileJson;
    } else {
      const text = await res.text();
      throw new TypeError(text);
    }
  } catch (ex) {
    throw ex;
  }
}

const getUserInfo = async () => {
  const response = await fetch(APIURL + "/api/sessions/current", {
    credentials: "include",
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user; // an object with the error coming from the server
  }
};

const logIn = async (credentials) => {
  const response = await fetch(APIURL + "/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const logOut = async () => {
  const response = await fetch(APIURL + "/api/sessions/current", {
    method: "DELETE",
    credentials: "include",
  });
  if (response.ok) return null;
};

const API = {
  getCourses,
  getUserInfo,
  getProfile,
  commitPlan,
  deleteCommittedPlan,
  logIn,
  logOut,

};

export default API;
