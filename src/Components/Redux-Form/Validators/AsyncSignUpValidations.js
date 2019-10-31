import axios from "../../../api/Shopping-Card";

const asyncSignUpValidations = async (values, dispatch, props, field) => {
  const errors = {};
  const graphqlQuery = `
    query {
      validateEmail(data:{
        email:"${values.email}"
      }) {
        success
        message
      }
    }
  `;
  try {
    const response = await axios.post("/graphql", { query: graphqlQuery });

    if (!response.data.data.validateEmail.success) {
      errors.email = response.data.data.validateEmail.message;
    } else {
      return;
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
  throw errors;
};
export default asyncSignUpValidations;
