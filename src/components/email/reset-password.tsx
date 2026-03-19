const { NEXT_PUBLIC_BASE_URL } = process.env

/* eslint-disable @next/next/no-img-element */
type ResetPasswordEmailTemplateProps = {
  resetLink: string
  firstName?: string
}

export const ResetPasswordEmailTemplate = ({
  resetLink,
  firstName,
}: ResetPasswordEmailTemplateProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  return (
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{ backgroundColor: '#EBE6DF' }}
    >
      <tr>
        <td align="center">
          <table width="600" cellPadding={0} cellSpacing={0} border={0}>
            {/* Spacer */}
            <tr>
              <td height={10}></td>
            </tr>
            {/* Header */}
            <tr>
              <td>
                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                  <tr>
                    <td align="left" width={265}></td>
                    <td align="center" width={70}>
                      <img
                        src={`${NEXT_PUBLIC_BASE_URL}/images/indra-logo-purple.png`}
                        alt="Indra logo"
                        width={70}
                        height={38}
                      />
                    </td>
                    <td align="right" width={265}></td>
                  </tr>
                </table>
              </td>
            </tr>
            {/* Spacer */}
            <tr>
              <td height={30}></td>
            </tr>
            {/* Border */}
            <tr>
              <td>
                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                  <tr>
                    <td height={1} style={{ background: '#E5E7EB' }}></td>
                  </tr>
                </table>
              </td>
            </tr>
            {/* Spacer */}
            <tr>
              <td height={20}></td>
            </tr>
            {/* Content */}
            <tr>
              <td>
                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                  <tr>
                    <td>
                      <p>Hi {firstName},</p>
                      <p>
                        We received a request to reset your password. Click the
                        link below to choose a new one. This link expires in 1
                        hour.
                      </p>
                      <p>
                        If you didn't request a password reset, you can safely
                        ignore this email.
                      </p>
                      <p>
                        <a
                          href={resetLink}
                          style={{
                            display: 'inline-block',
                            padding: '14px 18px',
                            backgroundColor: '#CEC8C6',
                            color: '#2B1B38',
                            textDecoration: 'none',
                            borderRadius: '70px',
                          }}
                        >
                          Reset password
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            {/* Spacer */}
            <tr>
              <td height={40}></td>
            </tr>
            {/* Footer */}
            <tr>
              <td>
                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                  <tr>
                    <td align="center">
                      <p
                        style={{
                          fontSize: '10px',
                          color: '#9EA2A7',
                        }}
                      >
                        This email was sent from{' '}
                        <a style={{ color: '#9EA2A7' }} href={baseUrl}>
                          {baseUrl}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  )
}
