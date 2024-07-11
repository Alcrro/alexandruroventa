import getCertificates from '@/_lib/certificates/getCertificates';
import Main from '@/components/certificates/main/Main';
import React from 'react'

export default async function page() {
  const main = await getCertificates();
  return (
    <Main documents={main.certificates} />
  )
}
