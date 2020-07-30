// export const createActions = (types: string[]) => {
//   return {
//     request(payload: any) {
//       return {
//         type: types[0],
//         payload,
//       };
//     },
//     success(payload: any) {
//       return {
//         type: types[1],
//         payload,
//       };
//     },
//     failure(error: any) {
//       return {
//         type: types[2],
//         error: error || 'Something bad happened',
//       };
//     },
//   };
// }

export const createActions = (actions: Function[]) => {
  return {
    request: actions[0],
    success: actions[1],
    failure: actions[2],
  };
}