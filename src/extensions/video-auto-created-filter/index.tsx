// // src/admin/extensions/components/video-auto-created-filter/index.tsx

// import React from 'react';
// import { Box } from '@strapi/design-system';
// import { Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
// import { Toggle } from '@strapi/design-system/';
// import { useQueryParams } from '@strapi/helper-plugin';

// const AutoCreatedFilter = () => {
//   const { query, updateQueryParams } = useQueryParams();
//   const isChecked = query?.filters?.auto_created ?? false;

//   const handleChange = () => {
//     const filters = isChecked ? {} : { auto_created: true };
//     updateQueryParams({ filters });
//   };

//   return (
//     <Box padding={4} background="neutral0" shadow="tableShadow">
//       <Field name="auto_created_filter" hint="Toggle to filter system-generated videos">
//         <FieldLabel>Show Only Auto-Created Videos</FieldLabel>
//         <ToggleInput
//           onLabel="Enabled"
//           offLabel="Disabled"
//           checked={isChecked}
//           onChange={handleChange}
//         />
//         <FieldHint />
//         <FieldError />
//       </Field>
//     </Box>
//   );
// };

// export default AutoCreatedFilter;
