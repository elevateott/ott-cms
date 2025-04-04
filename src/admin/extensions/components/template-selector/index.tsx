// // File: src/admin/extensions/components/template-selector/index.tsx
// import React from 'react';
// import { Select } from '@strapi/design-system';
// import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

// const TEMPLATE_OPTIONS = [
//   { label: 'Episode', value: 'episode' },
//   { label: 'Trailer', value: 'trailer' },
//   { label: 'Clip', value: 'clip' },
//   { label: 'Bonus', value: 'bonus' },
// ];

// const TemplateSelector = () => {
//   const { form } = useContentManagerContext();
//   const { values: modifiedData, onChange } = form;

//   const handleChange = (value: string) => {
//     onChange({ target: { name: 'template_type', value } });

//     if (value === 'trailer') {
//       onChange({ target: { name: 'status', value: 'draft' } });
//     }
//     if (value === 'episode') {
//       onChange({ target: { name: 'category', value: 'series' } });
//     }
//   };

//   return (
//     <Select label="Video Template" onChange={handleChange} value={modifiedData.template_type} required>
//       {TEMPLATE_OPTIONS.map((opt) => (
//         <Select.Option key={opt.value} value={opt.value}>
//           {opt.label}
//         </Select.Option>
//       ))}
//     </Select>
//   );
// };

// export default TemplateSelector;