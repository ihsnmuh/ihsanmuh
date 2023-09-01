import ImageFallback from '@/components/Atoms/image/fallback'
import { cn } from '@/lib/utils'
import React from 'react'

const Summary = () => {
  return (
    <section className={cn(
      'sticky top-0',
      'background border-t border-slate-200 dark:border-slate-800'
      )}>
        <div className='layout'>
          <h1>H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <h4>H4</h4>
            <ImageFallback
              src={"https://magento.femaledaily.com/media/catalog/product/m/a/maxb_ticket_thumbnail_-_platinum_presale_2_.png"}
              width={200}
              height={200}
              alt="test"
            />
            <ImageFallback
              src={"https://magento.femaledaily.com/media/catalog/product/m/a/maxb_ticket_thumbnail_-_platinum_presale_2_.png"}
              width={200}
              height={200}
              alt="test"
            />
            <ImageFallback
              src={"https://magento.femaledaily.com/media/catalog/product/m/a/maxb_ticket_thumbnail_-_platinum_presale_2_.png"}
              width={200}
              height={200}
              alt="test"
            />
            <ImageFallback
              src={"https://magento.femaledaily.com/media/catalog/product/m/a/maxb_ticket_thumbnail_-_platinum_presale_2_.png"}
              width={200}
              height={200}
              alt="test"
            />
          <p>aa</p>
        </div>
      </section>
  )
}

export default Summary