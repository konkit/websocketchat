require 'rails_helper'

RSpec.feature "Authentications", type: :feature do
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

  scenario "Auth with credentials", js: true do
    visit root_path

    # User signup
    expect {
      click_link 'Sign in with password'
      click_link '(don\'t have account yet?)'
      expect(page).to have_content('Please sign up')

      fill_in 'Username', with: 'TestCredentialsUser'
      find('#emailInput').set 'konkit@example.com'
      find('#passwordInput').set '321321321'
      find('#passwordConfirmationInput').set '321321321'
      click_button 'Submit'
      Capybara.using_wait_time(20) { expect(page).to have_content('User TestCredentialsUser joined') }
    }.to change(User, :count).by(1)

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    Capybara.using_wait_time(20) { expect(page).to have_content('Please sign in') }

    # User sign in
    find('#usernameInput').set 'konkit@example.com'
    find('#passwordInput').set '321321321'
    click_button 'Submit'

    Capybara.using_wait_time(20) { expect(page).to have_content('User TestCredentialsUser joined') }

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    Capybara.using_wait_time(20) { expect(page).to have_content('Please sign in') }  
  end
end
