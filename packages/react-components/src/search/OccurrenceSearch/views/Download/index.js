import React, { useEffect, useContext, useState, useCallback } from "react";
import { FilterContext } from '../../../../widgets/Filter/state';
import OccurrenceContext from '../../../SearchContext';
import { useQuery } from '../../../../dataManagement/api';
import { filter2predicate } from '../../../../dataManagement/filterAdapter';

const DOWNLOAD = `
query table($predicate: Predicate){
  occurrenceSearch(predicate: $predicate, size: 0) {
    _predicate
  }
}
`;

function Download() {
  const currentFilterContext = useContext(FilterContext);
  const { rootPredicate, predicateConfig } = useContext(OccurrenceContext);
  const { data, error, loading, load } = useQuery(DOWNLOAD, { lazyLoad: true, keepDataWhileLoading: true });
  const [fullPredicate, setPredicate] = useState();

  useEffect(() => {
    const predicate = {
      type: 'and',
      predicates: [
        rootPredicate,
        filter2predicate(currentFilterContext.filter, predicateConfig)
      ].filter(x => x)
    }
    load({ variables: { predicate } });
    setPredicate(predicate);
  }, [currentFilterContext.filterHash, rootPredicate]);

  return <div>
      You are about to download, to do so you will be redirected to GBIF.org. Be aware that an account is needed to download the content.
      {fullPredicate && <>
        <pre>{JSON.stringify(fullPredicate)}</pre>
        <a href={`https://www.gbif-uat.org/occurrence/download/request?predicate=${encodeURIComponent(JSON.stringify(fullPredicate))}#create`}>Download</a>
      </>}
    </div>
}

export default Download;

