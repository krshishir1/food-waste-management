import axios from "axios";
// import 'dotenv/config'

const SERVER_URL = "http://localhost:3500";

export const registerOrganization = async function (orgBody) {
  try {
    const request = {
      baseURL: SERVER_URL,
      url: `/auth/organization/register`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(orgBody),
    };

    const { data, status } = await axios(request);

    return { data, status };
  } catch (error) {
    console.log(`Error: `, error.response.data);

    const { data, status } = error.response;

    return { status, data };
  }
};

export const loginOrganization = async function (orgBody) {
  try {
    const request = {
      baseURL: SERVER_URL,
      url: `/auth/organization/login`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(orgBody),
    };

    const { data, status } = await axios(request);
    return [status, { ...data.result }];
  } catch (error) {
    console.log(error);
    const { data, status } = error.response;
    return [status, data.error];
  }
};

export const getOrganizationDetails = async function (orgEmail) {
  try {
    const request = {
      baseURL: SERVER_URL,
      url: `/auth/organization`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        email: orgEmail
      }
    };

    const { data, status } = await axios(request);
    return [status, { ...data.result }];
  } catch (error) {
    console.log(error);
    const { data, status } = error.response;
    return [status, data.error];
  }
};
