// "use client";

// import { useEffect, useState } from "react";

// interface RightClickMenuProps {
//   children: React.ReactNode;
//   menu: React.ReactNode;
// }

// export default function RightClickMenu({
//   children,
//   menu,
// }: RightClickMenuProps) {
//   const [menuPosition, setMenuPosition] = useState<{
//     x: number;
//     y: number;
//   } | null>(null);

//   const handleContextMenu = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setMenuPosition({ x: e.pageX, y: e.pageY });
//   };

//   const handleClick = () => {
//     setMenuPosition(null);
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   return (
//     <div
//       onContextMenu={handleContextMenu}
//       "
//     >
//       {children}

//       {menuPosition && (
//         <div
//           className="absolute z-50 bg-theme-dark border rounded shadow-md"
//           style={{
//             top: menuPosition.y,
//             left: menuPosition.x,
//             position: "absolute",
//           }}
//         >
//           {menu}
//         </div>
//       )}
//     </div>
//   );
// }
