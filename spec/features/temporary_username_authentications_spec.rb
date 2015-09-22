require 'rails_helper'

RSpec.feature "Teporary username authentications", type: :feature do
  scenario "Auth to chat with temporary username", js: true do
    visit root_path
    expect(page).to have_content('Please enter your username')

    fill_in 'Username', with: 'Test User 1'
    click_button 'Submit'

    expect(page).to have_content('User Test User 1 joined')

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    expect(page).to have_content('Please enter your username')
  end
end
