// Define the structure of each test case
export interface InvalidLoginData {
  wrongEmail: string;
  wrongPassword: string;
  errorMessage: string
}
// Export the data as an array of objects
export const invalidLoginData: InvalidLoginData[] = [
    {
    wrongEmail: "peraperic@gmail.com",
    wrongPassword: "test123",
    errorMessage: "Login was unsuccessful."
    },
]
