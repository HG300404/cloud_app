import React from 'react'

const LikeButtonComponent = (props) => {
  const {dataHref} = props
  return (
    <div style={{marginTop: '8px', background:"#fff" , width: "450px"}}>
      <div className="fb-like" data-href={dataHref} data-width="" data-colorscheme="light" data-layout="" data-action="" data-size="" data-share="true"></div>

    </div>
  )
}

export default LikeButtonComponent