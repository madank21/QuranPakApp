import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#04080F',
  },

  screenHeader: {
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#070D1A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,151,42,0.35)',
  },

  headerBack: {
    color: '#0ABFA3',
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F0C060',
    letterSpacing: 2,
  },

  headerCount: {
    fontSize: 12,
    color: '#8A8A9A',
    marginTop: 3,
  },

  searchWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#04080F',
  },

  searchWrapInner: {
    position: 'relative',
    justifyContent: 'center',
  },

  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },

  searchInput: {
    backgroundColor: 'rgba(10,18,35,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(200,151,42,0.35)',
    borderRadius: 12,
    paddingVertical: 11,
    paddingLeft: 40,
    paddingRight: 16,
    color: '#E8E0D0',
    fontSize: 14,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  indexCard: {
    backgroundColor: 'rgba(10,18,35,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(200,151,42,0.35)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardNum: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(200,151,42,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  cardNumText: {
    color: '#F0C060',
    fontWeight: '700',
  },

  cardBody: {
    flex: 1,
  },

  cardEn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E8E0D0',
  },

  cardMeta: {
    fontSize: 11,
    color: '#8A8A9A',
    marginTop: 2,
  },

  cardAr: {
    fontSize: 22,
    color: '#F0C060',
  },

  viewerHeader: {
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 18,
    backgroundColor: '#070D1A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,151,42,0.35)',
  },

  viewerInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  viewerInput: {
    flex: 1,
    backgroundColor: 'rgba(10,18,35,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(200,151,42,0.35)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#E8E0D0',
    marginRight: 10,
  },

  goBtn: {
    backgroundColor: '#0ABFA3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  goBtnText: {
    color: '#04080F',
    fontWeight: '700',
  },

  pageNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(7,13,26,0.6)',
  },

  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(10,18,35,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBtnText: {
    color: '#F0C060',
    fontSize: 18,
  },

  pageIndicator: {
    color: '#F0C060',
    fontSize: 14,
    fontWeight: '600',
  },

  quranPageWrap: {
    padding: 16,
    alignItems: 'center',
  },

  quranPageImg: {
    width: '100%',
    height: 600,
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  pagePlaceholder: {
    width: '100%',
    height: 500,
    borderWidth: 1,
    borderColor: 'rgba(200,151,42,0.2)',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10,18,35,0.9)',
  },

  placeholderIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  placeholderText: {
    color: '#8A8A9A',
    fontSize: 13,
  },
});

export default styles;