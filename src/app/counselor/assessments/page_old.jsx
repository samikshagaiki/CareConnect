// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function CounselorAssessmentsPage() {
//   const [assessments, setAssessments] =
//     useState([]);

//   async function fetchAssessments() {
//     try {
//       const response =
//         await fetch(
//           "/api/counselor/assessments"
//         );

//       const data =
//         await response.json();

//       if (data.success) {
//         setAssessments(
//           data.assessments
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     fetchAssessments();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-4xl font-bold">
//         Assessment Results
//       </h1>

//       <p className="mt-2 text-muted-foreground">
//         Review completed assessments
//         submitted by your patients.
//       </p>

//       <div className="mt-8 space-y-5">
//         {assessments.length ===
//         0 ? (
//           <div className="rounded-3xl border p-6">
//             No assessment results
//             found.
//           </div>
//         ) : (
//           assessments.map(
//             (assessment) => (
//               <div
//                 key={
//                   assessment._id
//                 }
//                 className="rounded-3xl border bg-card p-6"
//               >
//                 <h2 className="text-xl font-semibold">
//                   {
//                     assessment
//                       .patient
//                       ?.anonymousName
//                   }
//                 </h2>

//                 <p className="mt-2">
//                   Assessment:
//                   {" "}
//                   {
//                     assessment
//                       .template
//                       ?.title
//                   }
//                 </p>

//                 {assessment.score >
//                   0 && (
//                   <>
//                     <p className="mt-2">
//                       Score:
//                       {" "}
//                       {
//                         assessment.score
//                       }
//                     </p>

//                     <p>
//                       Severity:
//                       {" "}
//                       {
//                         assessment.severity
//                       }
//                     </p>
//                   </>
//                 )}

//                 <p className="mt-2">
//                   Submitted:
//                   {" "}
//                   {new Date(
//                     assessment.submittedAt
//                   ).toLocaleDateString()}
//                 </p>

//                 <div className="mt-4">
//                   <Link
//                     href={`/counselor/assessments/responses/${assessment._id}`}
//                     className="inline-block rounded-xl bg-primary px-4 py-2 text-primary-foreground"
//                   >
//                     Review Response
//                   </Link>
//                 </div>
//               </div>
//             )
//           )
//         )}
//       </div>
//     </div>
//   );
// }