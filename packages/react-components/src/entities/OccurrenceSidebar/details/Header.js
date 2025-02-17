
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { FormattedDate } from 'react-intl';
import ThemeContext from '../../../style/themes/ThemeContext';
import * as css from '../styles';
import { Row, Col, IconFeatures } from "../../../components";
import { Globe } from './Globe';

export function Header({
  data,
  loading,
  error,
  className,
  ...props
}) {
  const theme = useContext(ThemeContext);
  const item = data?.occurrence;
  return <Row wrap="no-wrap" css={css.header({ theme })}>
    {data?.occurrence?.volatile?.globe &&
      <Col grow={false} style={{ marginRight: 18 }}>
        <Globe {...data?.occurrence?.volatile?.globe} />
      </Col>
    }
    <Col grow>
      <div css={css.headline({ theme })}>
        <div css={css.breadcrumb({ theme })}>
          {/* <FormattedMessage id={`enums.basisOfRecord.${data?.occurrence?.basisOfRecord}`} /> */}
          Occurrence<span css={css.breadcrumbSeperator({ theme })}>
            <FormattedDate value={data?.occurrence?.eventDate}
              year="numeric"
              month="long"
              day="2-digit" />
          </span>
        </div>
        <h3 dangerouslySetInnerHTML={{ __html: data?.occurrence?.gbifClassification?.usage?.formattedName }}></h3>
        {/* <div style={{color: 'orange', marginTop: 4}}>Published as: Polycauliona polycarpa hoffman</div> */}
        {/* <div style={{fontSize: 13}}><MajorRanks taxon={data?.occurrence?.gbifClassification} rank={data?.occurrence?.gbifClassification?.usage?.rank}/></div> */}
      </div>
      {/* <div>Engkabelej</div> */}
      {/* <div style={{fontSize: 12, marginTop: 18}}><MdLocationOn /> <FormattedMessage id={`enums.countryCode.${data?.occurrence?.countryCode}`} /></div> */}
      <div css={css.entitySummary({ theme })}>
        <IconFeatures css={css.features({ theme })}
        eventDate={item.eventDate}
        countryCode={item.countryCode}
        locality={item.locality}
        />
        <IconFeatures css={css.features({ theme })}
          stillImageCount={item.stillImageCount}
          movingImageCount={item.movingImageCount}
          soundCount={item.soundCount}
          typeStatus={item.typeStatus}
          basisOfRecord={item.basisOfRecord}
          isSequenced={item.volatile.features.isSequenced}
          isTreament={item.volatile.features.isTreament}
          isClustered={item.volatile.features.isClustered}
          isSamplingEvent={item.volatile.features.isSamplingEvent}
          issueCount={item?.issues?.length}
        />
      </div>
    </Col>
  </Row>
};
