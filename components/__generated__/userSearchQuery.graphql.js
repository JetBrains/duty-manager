/**
 * @flow
 * @relayHash 1b1dcf6b81ec40f5f2cfe0981a0b6a5b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type userSearchQueryVariables = {|
  query: string
|};
export type userSearchQueryResponse = {|
  +search: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +profile: ?{|
      +avatar: ?{|
        +url: ?string
      |}
    |},
  |}>
|};
export type userSearchQuery = {|
  variables: userSearchQueryVariables,
  response: userSearchQueryResponse,
|};
*/


/*
query userSearchQuery(
  $query: String!
) {
  search(query: $query) {
    id
    name
    profile {
      avatar {
        url
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "search",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query"
      }
    ],
    "concreteType": "User",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "profile",
        "storageKey": null,
        "args": null,
        "concreteType": "Profile",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "avatar",
            "storageKey": null,
            "args": null,
            "concreteType": "Avatar",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "userSearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "userSearchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "userSearchQuery",
    "id": null,
    "text": "query userSearchQuery(\n  $query: String!\n) {\n  search(query: $query) {\n    id\n    name\n    profile {\n      avatar {\n        url\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7c49d21ecde3aa4b345f4fb2556d6376';
module.exports = node;
