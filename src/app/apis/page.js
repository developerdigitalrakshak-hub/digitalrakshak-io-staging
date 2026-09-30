import { redirect } from 'next/navigation';

export default function ApisRootPage() {
  redirect('/apis/oauth-token');
}
