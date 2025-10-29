import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      // from: 'sparshmaheshwari10c@gmail.com',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}









// import { resend } from "@/lib/resend";
// import VerficationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     await resend.emails.send({
//       from: "Mystery App <onboarding@resend.dev>",
//       to: email,
//       subject: "Mystery Message | Verification Code",
//     //   react: <VerificationEmail username={username} otp={verifyCode} />,
//       react: <VerficationEmail  />
//     });

//     return {
//       success: true,
//       message: "Verification email sent successfully",
//     };
//   } catch (emailError) {
//     console.error("Error sending verification email:", emailError);
//     return {
//       success: false,
//       message: "Failed to send verification email",
//     };
//   }
// }
