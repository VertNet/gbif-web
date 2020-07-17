const _ = require('lodash');
const terms = require('./terms.json')
const remarkTypes = require('./remarkTypes.json')

const remarkMap = remarkTypes.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
}, {})

const groupedTerms = terms.reduce((acc, cur) => {
    _.set(acc, `${cur.group}.${cur.simpleName}`, cur)
    return acc
}, {})



function getRemarks ({value, verbatim}) {
 
        if (_.isNil(value)) {
            return 'EXCLUDED';
        } else if (_.isNil(verbatim)) {
            return 'INFERRED';
        } else if (value.toString().toLowerCase().replace(/_/g, '') !== verbatim.toString().toLowerCase().replace(/_/g, '')) {
            return 'ALTERED';
        } else {
            return null
        }
  
}

  module.exports = Object.keys(groupedTerms).reduce((acc, cur) => {
    acc[cur] = (occurrence) => {
      const fieldIssues = occurrence.issues.reduce((y, x) => {
                remarkMap[x].relatedTerms.forEach( t => {
                    if(y[t]){
                        y[t].push(_.pick(remarkMap[x], ['id', 'severity']))
                    } else {
                        y[t] = [_.pick(remarkMap[x], ['id', 'severity'])]
                    }
                })
                return y;
      }, {})
      return Object.keys(groupedTerms[cur]).reduce((a,c) => {
        const value = groupedTerms[cur][c].esField ? _.get(occurrence, groupedTerms[cur][c].esField) : _.get(occurrence, groupedTerms[cur][c].simpleName);
        const verbatim = _.get(occurrence, `verbatim.core["${groupedTerms[cur][c].qualifiedName}"]`)
            if(value || verbatim){
                let term =  {
                    label: c,
                    value,
                    verbatim,
                    hideInDefaultView: groupedTerms[cur][c].hideInDefaultView || false
                }
                if( getRemarks(term)){
                    term.remarks = getRemarks(term)
                }
                if(fieldIssues[groupedTerms[cur][c].qualifiedName]){
                    term.issues = fieldIssues[groupedTerms[cur][c].qualifiedName]
                } 

                a.push(term)
            }   
                return  a;
            
      }, [])
    }
    return acc;
  }, {});
