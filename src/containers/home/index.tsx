import ImageFallback from '@/components/Atoms/image/fallback'
import React from 'react'

const HomeContainer = () => {
  return (
    <div>
        <ImageFallback
          src={"https://magento.femaledaily.com/media/catalog/product/m/a/maxb_ticket_thumbnail_-_platinum_presale_2_.png"}
          width={200}
          height={200}
          alt="test"
        />
      <p>aa</p>
    </div>
  )
}

export default HomeContainer