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

  return <div>
      You are about to download, to do so you will be redirected to GBIF.org. Be aware that an account is needed to download the content.
      {err && <div>
          {err.message}
        </div>}
      {fullPredicate && <>
        <a href={`https://www.gbif.org/occurrence/download/request?predicate=${encodeURIComponent(JSON.stringify(fullPredicate))}#create`}>Download</a>
      </>}
    </div>
}

export default Download;

