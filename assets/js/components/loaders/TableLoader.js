import React from 'react'
import ContentLoader from 'react-content-loader'

const TableLoader = props => (
  <ContentLoader
    speed={2}
    width={1000}
    height={550}
    viewBox="0 0 1000 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >

    <rect x="10" y="15" rx="3" ry="3" width="35" height="15" />
    <rect x="90" y="15" rx="3" ry="3" width="70" height="15" />
    <rect x="208" y="14" rx="3" ry="3" width="100" height="15" />
    <rect x="340" y="14" rx="3" ry="3" width="100" height="15" />
    <rect x="550" y="14" rx="3" ry="3" width="30" height="15" />
    <rect x="720" y="14" rx="3" ry="3" width="70" height="15" />
    <circle cx="879" cy="22" r="11" />
    <circle cx="914" cy="22" r="11" />
    <rect x="10" y="55" rx="3" ry="3" width="897" height="2" />
    <rect x="10" y="75" rx="3" ry="3" width="35" height="15" />
    <rect x="90" y="75" rx="3" ry="3" width="70" height="15" />
    <rect x="208" y="75" rx="3" ry="3" width="100" height="15" />
    <rect x="340" y="75" rx="3" ry="3" width="100" height="15" />
    <rect x="550" y="75" rx="3" ry="3" width="30" height="15" />
    <rect x="720" y="75" rx="3" ry="3" width="70" height="15" />
    <circle cx="879" cy="85" r="11" />
    <circle cx="914" cy="85" r="11" />
    <rect x="10" y="110" rx="3" ry="3" width="897" height="2" />
    <rect x="10" y="140" rx="3" ry="3" width="35" height="15" />
    <rect x="90" y="140" rx="3" ry="3" width="70" height="15" />
    <rect x="208" y="140" rx="3" ry="3" width="100" height="15" />
    <rect x="340" y="140" rx="3" ry="3" width="100" height="15" />
    <rect x="550" y="140" rx="3" ry="3" width="30" height="15" />
    <rect x="720" y="140" rx="3" ry="3" width="70" height="15" />
    <circle cx="879" cy="145" r="11" />
    <circle cx="914" cy="145" r="11" />
    <rect x="10" y="175" rx="3" ry="3" width="897" height="2" />


    
    
  </ContentLoader>
)

export default TableLoader