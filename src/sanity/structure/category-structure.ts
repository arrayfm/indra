import { ConfigContext, DocumentStore } from 'sanity'
import { SanityDocument } from '@sanity/client'
import { StructureBuilder } from 'sanity/structure'
import { LuTag } from 'react-icons/lu'
import { PiPlusBold } from 'react-icons/pi'
import { map } from 'rxjs/operators'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default function categoryStructure(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore,
  context: ConfigContext
) {
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id, title }`
  const options = { apiVersion: `2023-01-01` }

  return S.listItem()
    .title('Categories')
    .icon(LuTag)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents: SanityDocument[]) =>
          S.list()
            .id('group')
            .title('Group')
            .items([
              ...parents.map((parent: SanityDocument) =>
                orderableDocumentListDeskItem({
                  id: parent._id,
                  type: schemaType,
                  title: parent.title,
                  icon: LuTag,
                  filter: `(_type == $schemaType && parent._ref == $parentId) || _id == $parentId`,
                  params: { schemaType, parentId: `${parent._id}` },
                  createIntent: false, // do not add an option for item creation
                  menuItems: [
                    {
                      title: 'Add',
                      icon: PiPlusBold,
                      intent: {
                        type: 'create',
                        params: { type: schemaType },
                      },
                    },
                  ],
                  S,
                  context,
                })
              ),
            ])
            .menuItems([
              S.menuItem()
                .title('Add')
                .icon(PiPlusBold)
                .intent({
                  type: 'create',
                  params: { type: schemaType },
                }),
            ])
        )
      )
    )
}
