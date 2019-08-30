<template>
  <v-container class="grey lighten-5 align-center pa-0">
    <v-row class="text-center">
      <v-col>
        <!-- this -->
        <!-- {{ receivedData }} -->
        <v-btn
          :color="showForm != true ? 'success': 'warning'"
          @click="showForm=!showForm"
        >{{ showForm != true ? '案件作成':'閉じる'}}</v-btn>
      </v-col>
    </v-row>
    <div class="pa-0">
      <!-- <v-container v-if="showFrom" class="grey lighten-5 align-center"> -->
      <div v-if="showForm">
        <v-form ref="form">
          <v-row justify="center" no-gutters>
            <v-col cols="3">
              <span>受付日時：</span>
              <span>{{ $moment().locale('ja').format('llll') }}</span>
            </v-col>
            <v-col cols="3">
              <span>受付者:</span>
              <span>{{ $moment().locale('ja').format('llll') }}</span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field v-model="form.incommingPhone" label="着信番号" required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center">
            <v-col cols="3" class="text-center">
              <v-autocomplete
                v-model="form.field"
                :items="receivedData.fields"
                filled
                chips
                color="blue-grey lighten-2"
                label="屋号を選択してください"
                item-text="name"
                item-value="name"
                class="pa-0"
                return-object
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >{{ data.item.name }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="form.dial"
                :items="receivedData.dials"
                filled
                chips
                color="blue-grey lighten-2"
                label="分野選択してください"
                item-text="name"
                item-value="name"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >{{ data.item.number }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.number"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field v-model="form.firstname" class="pa-0 ma-0" label="名前" required></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <v-text-field v-model="form.phone1" class="pa-0 ma-0" label="かける番号" required></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <v-text-field class="pa-0 ma-0" label="住所" required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-btn @click="tsuikajyouhou =!tsuikajyouhou">追加情報</v-btn>
            </v-col>
          </v-row>

          <div v-if="tsuikajyouhou" justify="center">
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field class="pa-0 ma-0" label="会社名" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field class="pa-0 ma-0" label="かける番号２" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field class="pa-0 ma-0" label="FAX" required></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-row justify="center">
            <v-col cols="6">
              <v-btn @click="netnam">ネット割引</v-btn>
              <v-btn @click="cardKibo">カード希望</v-btn>
              <v-btn @click="bankKibo">金額未案内</v-btn>
              <v-btn @click="inspectionKibo">目視調査無料</v-btn>
              <v-textarea
                v-model="form.trouble"
                name="input-7-1"
                filled
                label="内容"
                auto-grow
                rows="6"
                required
                class="pa-0 ma-0"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="pa-0 ma-0" justify="center">
            <v-col class="pa-0 ma-0" cols="6">
              <v-textarea
                v-model="form.note"
                name="input-7-1"
                filled
                label="パートナー連絡事項"
                auto-grow
                rows="6"
                class="pa-0 ma-0"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center" class="pa-0 ma-0">
            <v-col cols="3" class="pa-0 ma-0">
              <v-text-field class="pa-0 ma-0" label="年齢" required></v-text-field>
            </v-col>
            <v-col cols="3" class="pa-0 ma-0 ml-2">
              <v-text-field class="pa-0 ma-0" label="性別" required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="pa-0 ma-0" cols="6">
              <v-autocomplete
                v-model="form.partnerAccount"
                :items="receivedData.partners"
                chips
                color="blue-grey lighten-2"
                label="パトナーを選択してください"
                item-text="name"
                return-object
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    @input="data.parent.selectItem(data.item)"
                  >{{ data.item.store_name }}</v-chip>
                </template>
                <template slot="item" slot-scope="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.store_name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="text-center pa-0 ma-0">
            <v-col>
              <v-btn @click="clicksaveButton">登録</v-btn>
              <v-btn>一時保存</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <!-- </v-container> -->
    </div>
  </v-container>
</template>
<script>
export default {
  props: ["buttonValue", "callNumber", "cfield", "cpartners", "cdial"],
  data() {
    return {
      receivedData: {
        fields: this.cfield.data,
        partners: this.cpartners,
        dials: this.cdial
      },
      tsuikajyouhou: false,
      form: {
        textArea: "名前:\nかける番号:\nなまえ:\n住所:",
        dial_no: "",
        naiyo: "",
        fieldData: "",
        partnerNote: "",
        partner_note: "",
        //from here
        incommingPhone: this.callNumber,
        phone1: this.callNumber,
        field: "",
        dial: "",
        firstname: "",
        familyname: "",
        company: "",
        generation: "",
        gender: "",
        fax: "",
        zyusho: "",
        trouble: "",
        note: "",
        status: "",
        accounts: "",
        cancelreason: "",
        workdate: "",
        account_id: "",
        partnerAccount: "",
        secondStatus: ""
      },
      showForm: false,
      fieldsData: [
        { id: 1, name: "鍵", alias: "K" },
        { id: 2, name: "水まわり", alias: "W" },
        { id: 3, name: "ガラス", alias: "G" },
        { id: 4, name: "パソコン", alias: "P" },
        { id: 5, name: "電気工事", alias: "D" },
        { id: 6, name: "内装", alias: "R" },
        { id: 7, name: "ハウスクリーニング", alias: "H" },
        { id: 8, name: "害虫駆除", alias: "M" },
        { id: 9, name: "屋根", alias: "Y" },
        { id: 10, name: "庭", alias: "N" },
        { id: 11, name: "エアコン", alias: "A" },
        { id: 12, name: "リノベ", alias: "R" },
        { id: 13, name: "ペット葬儀", alias: "S" },
        { id: 14, name: "盗聴器発見", alias: "T" },
        { id: 15, name: "家電", alias: "X" }
      ],
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado"
      ],
      filters: [
        {
          value: 0,
          fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
          text: "Exact Match"
        },
        {
          value: 1,
          fn: (item, queryText, itemText) =>
            queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: "Search Length > 2 & Loose Match"
        }
      ]
    };
  },
  watch: {
    buttonValue: function() {
      if (this.buttonValue == false) {
        this.showForm = false;
      }
    }
  },

  methods: {
    netnam() {
      this.form.textArea = this.form.textArea + "\ni am rabi";
      this.form.naiyo = this.form.naiyo + "\n内藤に追加";
    },
    cardKibo() {
      this.form.textArea = this.form.textArea + "\ni have card kibo";
      this.form.naiyo = this.form.naiyo + "\nもっともっとついか";
    },
    bankKibo() {
      this.form.textArea = this.form.textArea + "\ni have bank kibo";
      this.form.naiyo = this.form.naiyo + "\nもう一回ついか";
    },
    inspectionKibo() {
      this.form.textArea = this.form.textArea + "\ni have inspectionKibo kibo";
      this.form.naiyo = this.form.naiyo + "\n最後の追加";
    },
    clicksaveButton() {
      console.log(this.form);
    }
  }
};
</script>
