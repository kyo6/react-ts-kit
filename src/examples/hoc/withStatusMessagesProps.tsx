import React from 'react'

export type withStatusMessagesProps = {
  errorText?: string
  successText?: string
}


function withStatusMessages<P extends object>(WrappComponent: React.ComponentType<P>): React.FC<P & withStatusMessagesProps> {
  return ({errorText, successText, ...props}) => {
    return <>
      <WrappComponent {...props as P} />
      {errorText ? <div className="errorText">{errorText}</div> : null}
      {successText ? <div className="successText">{successText}</div> : null}
    </>
  }
}
export default withStatusMessages;