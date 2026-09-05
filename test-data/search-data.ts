// Define the structure of each test case
export interface SearchTestData {
  //scenario: string;
  searchTerm: string;
  expectedResult?: string; // Optional field, if needed later
}

// Export the data as an array of objects
export const searchTestData: SearchTestData[] = [
  {
    //scenario: 'Search for basic term - computer',
    searchTerm: 'computer'
  },
  // When you want to add a new term, just uncomment/add a row below:
  // {
  //   scenario: 'Search for laptop',
  //   searchTerm: 'laptop'
  // }
];
