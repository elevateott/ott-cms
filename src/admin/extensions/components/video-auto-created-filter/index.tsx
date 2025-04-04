// import React from 'react';
// import { useQueryParams } from '@strapi/strapi/admin';
// import { Box } from '@strapi/design-system';
// import { ToggleInput } from '@strapi/design-system';

// const AutoCreatedFilter = () => {
//   const { query, setQuery } = useQueryParams();
//   const current = query?.filters?.auto_created ?? false;

//   const handleChange = (value: boolean) => {
//     setQuery({ filters: { ...query.filters, auto_created: value } });
//   };

//   return (
//     <Box padding={4} background="neutral0" shadow="tableShadow">
//       <ToggleInput
//         label="Show Only Auto-Created Videos"
//         checked={current === true}
//         onChange={() => handleChange(!current)}
//         hint="Toggle to filter system-generated videos"
//       />
//     </Box>
//   );
// };

// export default AutoCreatedFilter;