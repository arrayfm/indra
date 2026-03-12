import { RiHome2Line, RiPagesLine } from 'react-icons/ri'
import { StructureBuilder } from 'sanity/structure'
import { ConfigContext, DocumentStore } from 'sanity'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import categoryStructure from './category-structure'

const content = ['page']
const types = ['menus']

export const structure = (
  S: StructureBuilder,
  context: ConfigContext & { documentStore: DocumentStore }
) =>
  S.list()
    .title('Content')
    .items([
      // --------------------- Content ---------------------
      ...S.documentTypeListItems().filter((listItem) =>
        content.includes(listItem.getId()?.toString() || '')
      ),
      // --------------------- Divider ---------------------
      // S.divider(),
      // --------------------- Types ---------------------
      // ...S.documentTypeListItems().filter((listItem) =>
      //   types.includes(listItem.getId()?.toString() || '')
      // ),
      // --------------------- Divider ---------------------
      S.divider(),
      // --------------------- Settings ---------------------
      S.listItem()
        .title('Site Settings')
        .icon(RiHome2Line)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
    ])
