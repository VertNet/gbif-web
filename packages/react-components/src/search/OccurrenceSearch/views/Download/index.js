import React, { useEffect, useContext, useState, useCallback } from "react";
import { FilterContext } from '../../../../widgets/Filter/state';
import OccurrenceContext from '../../../SearchContext';
import { useQuery } from '../../../../dataManagement/api';
import { filter2predicate } from '../../../../dataManagement/filterAdapter';

const DOWNLOAD = `
query($predicate: Predicate){
  occurrenceSearch(predicate: $predicate, size: 0) {
    _downloadPredicate
  }
}
`;

function Download() {
  const currentFilterContext = useContext(FilterContext);
  const { rootPredicate, predicateConfig } = useContext(OccurrenceContext);
  const { data, error, loading, load } = useQuery(DOWNLOAD, { lazyLoad: true, keepDataWhileLoading: true });

  useEffect(() => {
    const predicate = {
      type: 'and',
      predicates: [
        rootPredicate,
        filter2predicate(currentFilterContext.filter, predicateConfig)
      ].filter(x => x)
    }
    load({ variables: { predicate } });
  }, [currentFilterContext.filterHash, rootPredicate]);

  const fullPredicate = data?.occurrenceSearch?._downloadPredicate?.predicate;
  const err = data?.occurrenceSearch?._downloadPredicate?.err;

  const q = currentFilterContext?.filter?.must?.q;
  const hasFreeTextSearch = q && q.length > 1;
  
  return <div style={{textAlign: 'center'}}>
      {hasFreeTextSearch && <div>Free text search can be used for exploration, but do not have download support. 
        <button onClick={e => currentFilterContext.setField('q')}>Clear free text field</button>
      </div>}

      {!hasFreeTextSearch && <div>
        {err && <div>
          {err.message}
        </div>}
        {!err && fullPredicate && <>
          You are about to download, to do so you will be redirected to GBIF.org. Be aware that an account is needed to download the content.
          <a href={`https://www.gbif.org/occurrence/download/request?predicate=${encodeURIComponent(JSON.stringify(fullPredicate))}#create`}>Download</a>
        </>}
      </div>}
    </div>
}

export default Download;

