/**
 * @flow
 * @relayHash fedf177a604e97a501212856abc352c7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type teamQueryVariables = {||};
export type teamQueryResponse = {|
  +team: ?{|
    +id: string,
    +users: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +profile: ?{|
        +avatar: ?{|
          +url: ?string
        |}
      |},
    |}>,
  |}
|};
export type teamQuery = {|
  variables: teamQueryVariables,
  response: teamQueryResponse,
|};
*/


/*
query teamQuery {
  team {
    id
    users {
      id
      name
      profile {
        avatar {
          url
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "team",
    "storageKey": null,
    "args": null,
    "concreteType": "Team",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "users",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "teamQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "teamQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "teamQuery",
    "id": null,
    "text": "query teamQuery {\n  team {\n    id\n    users {\n      id\n      name\n      profile {\n        avatar {\n          url\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '98e8c98c6f754ae27e30007deb5df580';
module.exports = node;
